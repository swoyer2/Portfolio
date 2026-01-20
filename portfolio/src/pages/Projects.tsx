import { FC } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects: FC = () => {
  const projects = [
    {
      title: 'Manim Chess',
      description: 'A plugin for the popular animation library Manim that enables beautiful chess animations.',
      imageUrl: '/manim_chess.gif',
      githubUrl: 'https://github.com/swoyer2/manim_chess',
    },
    // Add more projects here
  ];

  return (
    <main className="container my-5">
      <header className="mb-4 text-light text-center">
        <h2 className="display-4 fw-bold mb-2">Projects</h2>
      </header>
      <div className="row">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  );
};

export default Projects;

