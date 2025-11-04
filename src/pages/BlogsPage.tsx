// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';

// interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   date: string;
//   readTime: string;
//   category: string;
//   image?: string;
// }

// const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: 'Understanding Carbon Credits: A Comprehensive Guide',
//     excerpt: 'Learn the fundamentals of carbon credits and how they play a crucial role in climate action and sustainable forestry projects.',
//     content: 'Carbon credits are a key mechanism in the global fight against climate change. This comprehensive guide explores how they work, their benefits, and their role in forestry projects.',
//     author: 'Flora Carbon Team',
//     date: '2024-01-15',
//     readTime: '5 min read',
//     category: 'Education',
//   },
//   {
//     id: 2,
//     title: 'AI-Powered MRV: Revolutionizing Carbon Project Monitoring',
//     excerpt: 'Discover how artificial intelligence is transforming Measurement, Reporting, and Verification processes in carbon projects.',
//     content: 'Artificial intelligence is revolutionizing the way we monitor and verify carbon projects. Learn how AI-powered MRV systems are improving accuracy and reducing costs.',
//     author: 'Flora Carbon Team',
//     date: '2024-01-10',
//     readTime: '7 min read',
//     category: 'Technology',
//   },
//   {
//     id: 3,
//     title: 'Forestry Carbon Projects: Best Practices and Standards',
//     excerpt: 'Explore the key standards and best practices for developing successful forestry carbon projects under VCS, Gold Standard, and more.',
//     content: 'Developing a successful forestry carbon project requires understanding various standards and methodologies. This article covers the essential frameworks and best practices.',
//     author: 'Flora Carbon Team',
//     date: '2024-01-05',
//     readTime: '8 min read',
//     category: 'Standards',
//   },
//   {
//     id: 4,
//     title: 'The Future of Nature-Based Climate Solutions',
//     excerpt: 'An in-depth look at how nature-based solutions are shaping the future of climate action and carbon markets.',
//     content: 'Nature-based solutions offer promising pathways to climate mitigation. Explore the trends, opportunities, and challenges in this rapidly evolving field.',
//     author: 'Flora Carbon Team',
//     date: '2023-12-28',
//     readTime: '6 min read',
//     category: 'Innovation',
//   },
//   {
//     id: 5,
//     title: 'Community Engagement in Carbon Projects',
//     excerpt: 'Learn why community engagement is crucial for the success and sustainability of forestry carbon projects.',
//     content: 'Successful carbon projects require strong community involvement. Discover strategies for engaging local communities and ensuring long-term project success.',
//     author: 'Flora Carbon Team',
//     date: '2023-12-20',
//     readTime: '5 min read',
//     category: 'Community',
//   },
//   {
//     id: 6,
//     title: 'Calculating Carbon Credits: Tools and Methodologies',
//     excerpt: 'A practical guide to calculating carbon credits using validated allometric equations and species-specific biomass estimates.',
//     content: 'Understanding how to accurately calculate carbon credits is essential for project developers. This guide covers the tools, methodologies, and best practices.',
//     author: 'Flora Carbon Team',
//     date: '2023-12-15',
//     readTime: '9 min read',
//     category: 'Tools',
//   },
// ];

// const categories = ['All', 'Education', 'Technology', 'Standards', 'Innovation', 'Community', 'Tools'];

// const BlogsPage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const filteredPosts = blogPosts.filter((post) => {
//     const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
//     const matchesSearch =
//       searchQuery === '' ||
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="bg-gradient-to-b from-emerald-950 to-black text-white min-h-screen">
//       {/* Header Section */}
//       <div className="pt-40 pb-20 container-padding mx-auto max-w-6xl text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
//         >
//           <BookOpen className="w-4 h-4" />
//           Flora Carbon Blog
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           className="text-3xl md:text-6xl font-bold text-emerald-200 mb-6"
//         >
//           Insights & Knowledge
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="text-xl text-gray-300 max-w-3xl mx-auto"
//         >
//           Stay informed with the latest updates, guides, and insights on carbon projects, climate solutions, and sustainable forestry.
//         </motion.p>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="container-padding mx-auto max-w-6xl mb-12">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="flex flex-col md:flex-row gap-4 mb-8"
//         >
//           {/* Search Bar */}
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search articles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-emerald-900/30 p-3 pl-10 rounded-lg border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 text-white"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                   selectedCategory === category
//                     ? 'bg-emerald-600 text-white shadow-lg'
//                     : 'bg-emerald-900/30 text-emerald-200 border border-emerald-700 hover:bg-emerald-800/40'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Blog Posts Grid */}
//       <div className="container-padding mx-auto max-w-6xl pb-32">
//         {filteredPosts.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredPosts.map((post, index) => (
//               <motion.article
//                 key={post.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 className="group relative bg-black/25 border border-emerald-800 rounded-2xl overflow-hidden backdrop-blur-md hover:border-emerald-600 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/40"
//               >
//                 {/* Image Placeholder */}
//                 <div className="h-48 bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 relative overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <BookOpen className="w-16 h-16 text-emerald-600/30" />
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
//                       {post.category}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       <span>{post.readTime}</span>
//                     </div>
//                   </div>

//                   <h3 className="text-xl font-bold text-emerald-100 mb-3 group-hover:text-emerald-300 transition-colors">
//                     {post.title}
//                   </h3>

//                   <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
//                     {post.excerpt}
//                   </p>

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-emerald-300 font-medium">{post.author}</span>
//                     <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group-hover:gap-3 duration-300">
//                       Read More
//                       <ArrowRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Hover Effect Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-600/5 group-hover:to-emerald-600/10 transition-all duration-300 pointer-events-none" />
//               </motion.article>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-20"
//           >
//             <BookOpen className="w-16 h-16 text-emerald-600/50 mx-auto mb-4" />
//             <p className="text-xl text-gray-400">No articles found matching your criteria.</p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogsPage;

