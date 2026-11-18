"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { Modal } from "@/components/ui/modal";
import { ProjectIcon } from "./project-icon";
import { ProjectStatus } from "./project-card";

export function ProjectDetails({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      labelledBy="project-details-title"
    >
      {project && (
        <>
          <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-surface p-5">
            <ProjectIcon slug={project.slug} />
            <div className="min-w-0 flex-1">
              <h2
                id="project-details-title"
                className="break-words text-lg font-semibold"
              >
                {project.name}
              </h2>
              <ProjectStatus project={project} />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-background"
            >
              <X aria-hidden className="h-[18px] w-[18px]" />
            </button>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            {project.image && (
              <div className="overflow-hidden rounded-lg border border-border">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={1200}
                  height={660}
                  sizes="(min-width: 768px) 720px, 95vw"
                  className="h-auto w-full"
                />
              </div>
            )}
            <dl className="space-y-5">
              {[
                { label: "Problem", value: project.problem },
                { label: "Solution", value: project.solution },
                { label: "My role", value: project.role },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-semibold">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-7 text-foreground-muted">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div>
              <h3 className="text-sm font-semibold">Technology stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Visit project <ArrowUpRight aria-hidden className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
