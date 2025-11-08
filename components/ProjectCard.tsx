// 📇 Project Card Component
// This component displays a single project thumbnail in the portfolio grid.
// In edit mode, it shows controls for editing, deleting, and reordering.

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

const getCardSpan = (index: number) => {
    if ((index + 1) % 7 === 0) return 'lg:col-span-2';
    return 'lg:col-span-1';
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const fallbackThumbnail = `https://picsum.photos/seed/${project.id}/800/600`;

  return (
    <motion.div
      className={`group relative aspect-video overflow-hidden ${getCardSpan(index)}`}
      variants={cardVariants}
      key={project.id}
    >
      <Link to={`/portfolio/${project.id}`} className="block w-full h-full">
        <img
          src={project.thumbnail || fallbackThumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 group-hover:bg-opacity-70" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div
            className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
          >
            <h3 className="text-xl font-bold uppercase">{project.title}</h3>
            <p className="text-sm text-neutral-300">{project.category}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;