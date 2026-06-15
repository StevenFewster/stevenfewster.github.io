import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProjectCard from "../ProjectCard.vue";
import type { ProjectItem } from "../ProjectList.vue";

const baseProject: ProjectItem = {
  id: 1,
  name: "Test Project",
  shortDescription: "A short description",
  description: "A longer description of the project",
  priority: 1,
  status: "In Progress",
  tags: ["vue", "typescript", "tailwind"],
};

describe("ProjectCard", () => {
  it("renders the project name", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "" },
    });
    expect(wrapper.find("h2").text()).toBe("Test Project");
  });

  it("renders the short description", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "" },
    });
    expect(wrapper.text()).toContain("A short description");
  });

  it("renders the status badge", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "" },
    });
    expect(wrapper.text()).toContain("In Progress");
  });

  it("renders all tags", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "" },
    });
    const tags = wrapper.findAll("span").filter((s) => baseProject.tags.includes(s.text()));
    expect(tags).toHaveLength(baseProject.tags.length);
  });

  it("shows github link when provided", () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: { ...baseProject, githubLink: "https://github.com/example" },
        searchTerm: "",
      },
    });
    const link = wrapper.find('a[title="View project on GitHub"]');
    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("https://github.com/example");
  });

  it("hides github link when not provided", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: { ...baseProject, githubLink: undefined }, searchTerm: "" },
    });
    expect(wrapper.find('a[title="View project on GitHub"]').exists()).toBe(false);
  });

  it("shows live link when provided", () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: { ...baseProject, liveLink: "https://example.com" },
        searchTerm: "",
      },
    });
    const link = wrapper.find('a[title="View project site"]');
    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("https://example.com");
  });

  it("hides live link when not provided", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: { ...baseProject, liveLink: undefined }, searchTerm: "" },
    });
    expect(wrapper.find('a[title="View project site"]').exists()).toBe(false);
  });

  it("highlights tags that match the search term", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "vue" },
    });
    const tagSpans = wrapper.findAll("span").filter((s) =>
      baseProject.tags.some((t) => s.text() === t),
    );
    const vueTag = tagSpans.find((s) => s.text() === "vue");
    expect(vueTag?.classes()).toContain("bg-wedgewood-300");
  });

  it("does not highlight tags that don't match the search term", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "vue" },
    });
    const tagSpans = wrapper.findAll("span").filter((s) =>
      baseProject.tags.some((t) => s.text() === t),
    );
    const tsTag = tagSpans.find((s) => s.text() === "typescript");
    expect(tsTag?.classes()).not.toContain("bg-wedgewood-300");
    expect(tsTag?.classes()).toContain("bg-wedgewood-50");
  });

  it("does not highlight any tags when search term is empty", () => {
    const wrapper = mount(ProjectCard, {
      props: { project: baseProject, searchTerm: "" },
    });
    const tagSpans = wrapper.findAll("span").filter((s) =>
      baseProject.tags.some((t) => s.text() === t),
    );
    tagSpans.forEach((tag) => {
      expect(tag.classes()).not.toContain("bg-wedgewood-300");
    });
  });
});
