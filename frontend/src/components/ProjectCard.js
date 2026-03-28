import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const fallbackImage = 'https://picsum.photos/400/300';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Image - Full Width Top */}
      <div className="w-full bg-gray-200 relative h-56 overflow-hidden">
        <img 
          src={project.image || fallbackImage} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {e.target.src = fallbackImage}}
        />
        {/* Status Badge - Top Right */}
        <div className="absolute top-2 right-2">
          <span className={`inline-block px-3 py-1 rounded text-white text-xs font-semibold ${
            project.status === 'Ongoing' ? 'bg-blue-600' :
            project.status === 'Completed' ? 'bg-green-600' :
            'bg-amber-600'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content - Below Image */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
        
        {/* Location */}
        <div className="flex items-start text-gray-700 mb-3">
          <FaMapMarkerAlt className="mr-2 text-gray-600 flex-shrink-0 text-sm mt-0.5" />
          <p className="text-sm line-clamp-1">{project.location}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-4 line-clamp-2">{project.description}</p>

        {/* Info Row */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-500 font-semibold">TYPE</p>
            <p className="text-sm font-bold text-gray-800">{project.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">UNITS</p>
            <p className="text-sm font-bold text-gray-800">{project.totalUnits}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">AVAILABLE</p>
            <p className="text-sm font-bold text-gray-800">{project.availableUnits}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 font-semibold mb-1">FROM</p>
          <p className="text-2xl font-bold text-amber-600">{project.priceRange}</p>
        </div>

        {/* CTA Button */}
        <Link 
          to={`/project/${project._id}`}
          className="w-full block text-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded transition text-sm"
        >
          VIEW DETAILS
        </Link>
      </div>
    </div>
  );
}
