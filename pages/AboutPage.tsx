// 👤 About Page
// This page provides a personal introduction.
// It includes a short bio, a list of technical skills/tools, and an image.

import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useEditor } from '../components/EditorProvider';

function AboutPage() {
  const { siteContent } = useEditor();

  if (!siteContent) return null;

  const SkillsList = () => (
    <div className="flex flex-wrap gap-2">
      {siteContent.about.skills.map((skill, index) => (
        <motion.span
          key={skill}
          className="bg-neutral-800 text-neutral-300 px-3 py-1 text-sm font-medium rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
  
  return (
    <AnimatedPage>
      <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-8 text-white">
        <div className="container mx-auto max-w-5xl">
          {/* --- Profile Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-center mb-24">
            <motion.div
              className="md:col-span-2 group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(https://picsum.photos/seed/about-me/800/800)` }}
                />
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                I'm Vikas.
              </h1>

              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
                {siteContent.about.bio}
              </p>
              
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">Skills & Tools</h2>
              <SkillsList />
            </motion.div>
          </div>

          {/* --- Testimonials Section --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex justify-center items-center gap-4 mb-12">
                <h2 className="text-4xl font-bold uppercase tracking-wider text-center">
                    What Others Say
                </h2>
            </div>
            
            {siteContent.testimonials.length > 0 ? (
                <div className="space-y-8">
                  {siteContent.testimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      className="bg-neutral-900 p-6 rounded-lg flex flex-col relative"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6 }}
                    >
                      <p className="text-neutral-300 italic flex-grow mb-6">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                        <div>
                          <p className="font-bold text-white">{testimonial.name}</p>
                          <p className="text-sm text-neutral-500">{testimonial.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
            ) : (
               <p className="text-center text-neutral-500">No testimonials yet.</p>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;