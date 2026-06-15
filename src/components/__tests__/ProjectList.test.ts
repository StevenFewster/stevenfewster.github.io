import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ProjectList from "../ProjectList.vue";
import type { ProjectItem } from "../ProjectList.vue";

const projects: ProjectItem[] = [
  {
    id: 1,
    name: "Alpha",
    shortDescription: "Alpha short",
    description: "Alpha desc",
    priority: 1,
    status: "Complete",
    tags: ["vue"],
  },
  {
    id: 2,
    name: "Beta",
    shortDescription: "Beta short",
    description: "Beta desc",
    priority: 2,
    status: "In Progress",
    tags: ["react"],
  },
  {
    id: 3,
    name: "Gamma",
    shortDescription: "Gamma short",
    description: "Gamma desc",
    priority: 3,
    status: "Not Started",
    tags: ["angular"],
  },
];

describe("ProjectList", () => {
  it("filters projects by the selected status", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    const radios = wrapper.findAll('input[type="radio"]');
    const completeRadio = radios.find((r) => r.element.getAttribute("value") === "Complete");
    await completeRadio?.setValue("Complete");

    expect(wrapper.text()).toContain("Alpha");
    expect(wrapper.text()).not.toContain("Beta");
    expect(wrapper.text()).not.toContain("Gamma");
  });

  it("shows all projects when 'All' is selected with no search term", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    const radios = wrapper.findAll('input[type="radio"]');
    const allRadio = radios.find((r) => r.element.getAttribute("value") === "All");
    await allRadio?.setValue("All");

    expect(wrapper.text()).toContain("Alpha");
    expect(wrapper.text()).toContain("Beta");
    expect(wrapper.text()).toContain("Gamma");
  });

  it("filters by search term regardless of status", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    const input = wrapper.find('input[type="text"]');
    await input.setValue("Alpha");
    await nextTick();

    expect(wrapper.text()).toContain("Alpha");
    expect(wrapper.text()).not.toContain("Beta");
    expect(wrapper.text()).not.toContain("Gamma");
  });

  it("switches to 'All' when a non-blank search term is entered", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    const input = wrapper.find('input[type="text"]');
    await input.setValue("Alpha");
    await nextTick();

    const allRadio = wrapper.find('input[type="radio"][value="All"]');
    expect((allRadio.element as HTMLInputElement).checked).toBe(true);
  });

  it("shows the clear button when the search term is non-empty", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    expect(wrapper.find("button").exists()).toBe(false);

    const input = wrapper.find('input[type="text"]');
    await input.setValue("test");
    await nextTick();

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("clears the search term when the clear button is clicked", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    const input = wrapper.find('input[type="text"]');
    await input.setValue("Alpha");
    await nextTick();

    await wrapper.find("button").trigger("click");
    await nextTick();

    expect((input.element as HTMLInputElement).value).toBe("");
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("renders one ProjectCard per filtered project", async () => {
    const wrapper = mount(ProjectList, { props: { projectData: projects } });

    const radios = wrapper.findAll('input[type="radio"]');
    const allRadio = radios.find((r) => r.element.getAttribute("value") === "All");
    await allRadio?.setValue("All");

    const cards = wrapper.findAll(".w-full.p-4");
    expect(cards).toHaveLength(projects.length);
  });
});
