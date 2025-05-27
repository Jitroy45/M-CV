
import React, { useEffect, useRef } from 'react';

interface SectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
  onVisible: (id: string) => void;
  isFocused: boolean;
}

const Section: React.FC<SectionProps> = ({ title, id, children, onVisible, isFocused }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible(id);
            // Add class to trigger item animations
            entry.target.classList.add('section-in-view');
          } else {
            // Optional: remove class if you want animations to re-trigger on scroll back
            // entry.target.classList.remove('section-in-view');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px', // Trigger when 40% from bottom is visible
        threshold: 0.1, // At least 10% of section is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [id, onVisible]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-10 px-6 my-12 border rounded-lg shadow-xl bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg transition-all duration-700 ease-in-out transform
        ${isFocused ? 'border-green-500 shadow-green-600/40 opacity-100 scale-100' : 'border-green-800 shadow-green-900/20 opacity-80 scale-98'}
      `}
    >
      <h2 className={`text-2xl md:text-3xl font-bold mb-8 pb-3 border-b-2 
        ${isFocused ? 'text-green-300 border-green-500 subtle-glow' : 'text-green-600 border-green-700'} 
        transition-colors duration-500`}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};

export default Section;
