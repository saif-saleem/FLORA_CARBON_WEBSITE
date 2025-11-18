import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'individual' | 'group';
  billingCycle: 'monthly' | 'annual';
  amount: number;
  onPaymentSuccess: () => void;
  createOrder: (planType: string, billingCycle: string) => Promise<any>;
  verifyPayment: (paymentData: any) => Promise<any>;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planType,
  billingCycle,
  amount,
  onPaymentSuccess,
  createOrder,
  verifyPayment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'init' | 'processing' | 'success' | 'error'>('init');

  // Load Razorpay script
  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onerror = () => {
      setError('Failed to load payment gateway. Please refresh and try again.');
    };
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [isOpen]);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      setError('Payment gateway not loaded. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStep('processing');

    try {
      // Create order on backend
      const orderData = await createOrder(planType, billingCycle);

      if (!orderData.orderId || !orderData.keyId) {
        throw new Error('Failed to create payment order');
      }

      // Razorpay options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Flora Carbon GPT',
        description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Subscription`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planType: planType,
              billingCycle: billingCycle,
            };

            await verifyPayment(verificationData);
            setStep('success');
            setTimeout(() => {
              onPaymentSuccess();
              onClose();
            }, 2000);
          } catch (err: any) {
            console.error('Payment verification error:', err);
            setError(err.response?.data?.msg || 'Payment verification failed. Please contact support.');
            setStep('error');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          // You can prefill user details if available
        },
        theme: {
          color: '#10b981', // Emerald color
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            setStep('init');
            setError(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response);
        setError(response.error.description || 'Payment failed. Please try again.');
        setStep('error');
        setIsLoading(false);
      });

      razorpay.open();
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.response?.data?.msg || 'Failed to initiate payment. Please try again.');
      setStep('error');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={step === 'init' ? onClose : undefined}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10"
        >
          {step === 'init' && (
            <>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isLoading}
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full">
                  <CreditCard size={32} className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Complete Your Payment
              </h2>

              {/* Plan Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Plan:</span>
                  <span className="font-semibold text-gray-900 capitalize">{planType}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Billing:</span>
                  <span className="font-semibold text-gray-900 capitalize">{billingCycle}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      Pay ₹{amount.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <Loader2 size={48} className="animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-700">Processing your payment...</p>
              <p className="text-sm text-gray-500 mt-2">Please complete the payment in the popup window</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Your subscription has been activated.</p>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-8">
              <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-4">{error || 'Something went wrong. Please try again.'}</p>
              <button
                onClick={() => {
                  setStep('init');
                  setError(null);
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;

