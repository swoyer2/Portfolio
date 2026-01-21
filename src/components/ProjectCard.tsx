import { FC } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  githubUrl,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card project-card bg-transparent h-100"
        onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer', overflow: 'hidden' }}
      >
        <img
          src={imageUrl}
          className="card-img-top"
          alt={`${title} preview`}
          style={{ display: 'block', width: '100%' }}
        />

        <div className="card-body">
          <h5 className="card-title text-light">{title}</h5>
          <p className="card-text text-light">{description}</p>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          position: relative;
          border: 0;
        }

        /* corner borders */
        .project-card::before,
        .project-card::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: 2px solid #333333;
          transition: all 0.3s ease;
        }

        /* top-left corner */
        .project-card::before {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        /* bottom-right corner */
        .project-card::after {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }

        /* grow borders on hover */
        .project-card:hover::before,
        .project-card:hover::after {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;

