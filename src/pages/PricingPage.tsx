import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Users, Building, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TrialPopup from '../components/TrialPopup';
import PaymentModal from '../components/PaymentModal';

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showTrialPopup, setShowTrialPopup] = useState(false);
  const [isStartingTrial, setIsStartingTrial] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ type: 'individual' | 'group'; billingCycle: 'monthly' | 'annual' } | null>(null);
  const { isAuthenticated, startTrial, trialStatus, createPaymentOrder, verifyPayment, refreshTrialStatus } = useAuth();
  const navigate = useNavigate();

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      subtitle: 'No credit card required',
      icon: Zap,
      monthlyPrice: 0,
      annualPrice: 0,
      currency: '$',
      period: 'mo',
      features: [
        '50,000 tokens/mo',
        'Community support',
        'Basic AI features',
        'Standard response time',
        'Public documentation'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'secondary',
      popular: false
    },
    {
      id: 'individual',
      name: 'Individual',
      subtitle: 'Perfect for individuals',
      icon: Users,
      monthlyPrice: 20,
      annualPrice: 18,
      currency: '$',
      period: 'mo',
      features: [
        '1,000,000 tokens/mo',
        'Priority email support',
        'Overage billing at published rate',
        'Advanced AI features',
        'Faster response times',
        'Email support'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'secondary',
      popular: false
    },
    {
      id: 'group',
      name: 'Group / Company',
      subtitle: 'Per seat, pooled credits',
      icon: Building,
      monthlyPrice: 20,
      annualPrice: 16,
      currency: '$',
      period: 'seat/mo',
      features: [
        '1,000,000 tokens/seat/mo (pooled)',
        'Admin dashboard',
        'Usage analytics',
        'Priority support',
        'Volume discounts available',
        'Team collaboration tools',
        'Advanced reporting'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'primary',
      popular: true
    },
    {
      id: 'custom',
      name: 'Custom',
      subtitle: 'Enterprise solutions',
      icon: Crown,
      monthlyPrice: null,
      annualPrice: null,
      currency: '',
      period: '',
      features: [
        'Custom token caps & throughput',
        'Consultancy services',
        'SLA guarantees',
        'Dedicated support channel',
        'Private/VPC options',
        'Custom integrations',
        'Prompt design & evaluations'
      ],
      buttonText: 'Contact Us',
      buttonStyle: 'secondary',
      popular: false
    }
  ];

  const handleGetStarted = (planId: string) => {
    if (!isAuthenticated) {
      // Redirect to sign in
      navigate('/auth');
      return;
    }

    // Check if user already has active subscription
    if (trialStatus?.hasPaidPlan) {
      // User already has paid plan, can proceed to GPT
      const { VITE_CARBONGPT_URL } = import.meta.env;
      window.location.href = VITE_CARBONGPT_URL || 'http://localhost:5174/';
      return;
    }

    if (planId === 'free') {
      // Free plan - only trial available
      // Check if user already has active trial
      if (trialStatus?.isTrialActive && trialStatus.daysRemaining > 0) {
        // User already has active trial, can proceed to GPT
        const { VITE_CARBONGPT_URL } = import.meta.env;
        window.location.href = VITE_CARBONGPT_URL || 'http://localhost:5174/';
        return;
      }

      // Check if user has already used trial
      if (trialStatus?.hasUsedTrial && !trialStatus.isTrialActive) {
        // Show upgrade prompt
        alert('You have already used your free trial. Please upgrade to a paid plan to continue.');
        return;
      }

      // Show trial popup for free plan
      setShowTrialPopup(true);
    } else if (planId === 'individual' || planId === 'group') {
      // Paid plans - show payment modal
      setSelectedPlan({
        type: planId as 'individual' | 'group',
        billingCycle: isAnnual ? 'annual' : 'monthly',
      });
      setShowPaymentModal(true);
    } else if (planId === 'custom') {
      // Contact sales for custom plan
      alert('Please contact our sales team for enterprise plans.');
    }
  };

  const handleStartTrial = async () => {
    setIsStartingTrial(true);
    try {
      const result = await startTrial();
      if (result.success) {
        setShowTrialPopup(false);
        // Redirect to GPT app after successful trial start with trialStarted flag
        const { VITE_CARBONGPT_URL } = import.meta.env;
        const url = new URL(VITE_CARBONGPT_URL || 'http://localhost:5174/');
        url.searchParams.set('trialStarted', 'true');
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        if (token) url.searchParams.set('token', token);
        if (userName) url.searchParams.set('name', userName);
        if (userEmail) url.searchParams.set('email', userEmail);
        window.location.href = url.toString();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Failed to start trial. Please try again.');
    } finally {
      setIsStartingTrial(false);
    }
  };

  const handlePaymentSuccess = async () => {
    await refreshTrialStatus();
    // Redirect to GPT app after successful payment
    const { VITE_CARBONGPT_URL } = import.meta.env;
    window.location.href = VITE_CARBONGPT_URL || 'http://localhost:5174/';
  };

  const getPlanAmount = (planId: string, billingCycle: 'monthly' | 'annual') => {
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return 0;
    
    // Convert USD to INR (approximate conversion: 1 USD = 83 INR)
    const usdToInr = 83;
    const monthlyPrice = (billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice) * usdToInr;
    return billingCycle === 'annual' ? monthlyPrice * 12 : monthlyPrice;
  };

  const getVolumeDiscounts = () => {
    if (isAnnual) {
      return [
        { seats: '5-9', discount: '10%', price: '$16.20/seat/mo' },
        { seats: '10-49', discount: '20%', price: '$14.40/seat/mo' },
        { seats: '50+', discount: 'Custom', price: 'Contact us' }
      ];
    } else {
      return [
        { seats: '5-9', discount: '10%', price: '$18/seat/mo' },
        { seats: '10-49', discount: '20%', price: '$16/seat/mo' },
        { seats: '50+', discount: 'Custom', price: 'Contact us' }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-transparent to-gray-200"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              Flora Carbon GPT
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            >
              AI-Powered Carbon Management
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Streamline your carbon tracking and reporting with intelligent automation
            </motion.p>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
                  Save 10%
                </span>
              )}
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-emerald-500 scale-105' : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${plan.popular ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                      <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-emerald-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.subtitle}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.monthlyPrice !== null ? (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">
                          {plan.currency}{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-500 ml-1">/{plan.period}</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-gray-900">Custom</div>
                    )}
                    {isAnnual && plan.id === 'individual' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Annual: ${plan.annualPrice * 12}/yr (effective ${plan.annualPrice}/mo)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => handleGetStarted(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      plan.buttonStyle === 'primary'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Volume Discounts for Group Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Group / Company Volume Discounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVolumeDiscounts().map((discount, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{discount.seats} seats</div>
                  <div className="text-lg font-semibold text-emerald-600 mb-2">{discount.discount} off</div>
                  <div className="text-sm text-gray-600">{discount.price}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isAnnual 
                  ? 'Annual plans include an extra 10% discount on the discounted subtotal'
                  : 'Switch to annual billing for additional 10% savings'
                }
              </p>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions about pricing?</h3>
            <p className="text-gray-600 mb-6">
              Contact our sales team for custom enterprise solutions and volume discounts.
            </p>
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trial Popup */}
      <TrialPopup
        isOpen={showTrialPopup}
        onClose={() => setShowTrialPopup(false)}
        onConfirm={handleStartTrial}
        isLoading={isStartingTrial}
      />

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          planType={selectedPlan.type}
          billingCycle={selectedPlan.billingCycle}
          amount={getPlanAmount(selectedPlan.type, selectedPlan.billingCycle)}
          onPaymentSuccess={handlePaymentSuccess}
          createOrder={createPaymentOrder}
          verifyPayment={verifyPayment}
        />
      )}
    </div>
  );
};

export default PricingPage;
