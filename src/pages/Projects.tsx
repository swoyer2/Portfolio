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
    {
      title: 'Discord Rubik\'s Cube Bot',
      description: 'A Discord bot that allows users to interact with a virtual Rubik\'s Cube.',
      imageUrl: '/discord_rubiks_cube.gif',
      githubUrl: 'https://github.com/swoyer2/Discord-Rubiks-Cube',
    },
    {
      title: 'Regression Video Explainer',
      description: 'A video about regression and how it can be used to make predicitions.',
      imageUrl: '/regression.gif',
      githubUrl: 'https://github.com/swoyer2/Regression-Video-Code',
    },
  ];

  return (
    <main className="container my-5">
      <header className="mb-4 text-light text-center">
        <h2 className="display-4 fw-bold mb-4">Projects</h2>
        <p className="text-primary">Some of my favorite projects that have nice visuals.</p>
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

