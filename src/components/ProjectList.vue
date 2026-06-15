<template>
  <div>
    <blockquote
      class="mx-6 my-6 border-l-4 border-wedgewood-400 px-3 py-6 text-base italic text-wedgewood-800"
    >
      This is a page written in Vue, and nested within an Astro project. The
      goal of this page is to track and organise my projects, and to provide a
      way for me to share my projects with others. The project data is currently
      fetched from a static JSON file for simplicity.
    </blockquote>

    <div class="flex w-full items-center justify-center">
      <div class="px-3 py-3">
        <div class="flex flex-wrap rounded-md ring-1 ring-wedgewood-400">
          <label
            class="cursor-pointer"
            v-for="status in statuses"
            :key="status"
          >
            <input
              type="radio"
              class="peer sr-only"
              name="project-status"
              v-model="selectedStatus"
              :value="status"
            />
            <div
              class="w-24 max-w-xl border-r border-wedgewood-400 p-2 text-gray-500 hover:shadow peer-checked:bg-wedgewood-400 peer-checked:text-white peer-checked:ring-wedgewood-400 peer-checked:ring-offset-2"
              :class="{ 'border-r-0': status === 'Paused' }"
            >
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold">{{ status }}</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div class="relative">
        <input
          type="text"
          class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm placeholder-gray-400 shadow-sm focus:border-wedgewood-400 focus:outline-none focus:ring-1 focus:ring-wedgewood-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
          placeholder="Search projects..."
          v-model="searchTerm"
        />
        <button
          v-if="searchTerm"
          @click="searchTerm = ''"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div v-for="project in filteredProjects" :key="project.id">
      <ProjectCard :project="project" :searchTerm="searchTerm" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ProjectItem {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  priority: number;
  status: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
}
import { ref, computed, watch } from "vue";
import ProjectCard from "./ProjectCard.vue";
const props = defineProps<{ projectData: ProjectItem[] }>();
const statuses: string[] = [
  "All",
  "Complete",
  "In Progress",
  "Not Started",
  "Paused",
];
const selectedStatus = ref("In Progress");
const searchTerm = ref("");

watch(searchTerm, (val) => {
  if (val.trim() !== "") selectedStatus.value = "All";
});

const filteredProjects = computed(() => {
  if (selectedStatus.value === "All") {
    if (searchTerm.value.trim() === "") {
      return props.projectData;
    }
    return props.projectData.filter((project) =>
      searchFilter(project, searchTerm.value),
    );
  }
  return props.projectData.filter((project) => {
    return (
      project.status === selectedStatus.value &&
      searchFilter(project, searchTerm.value)
    );
  });
});

const searchFilter = (project: ProjectItem, searchTerm: string) => {
  const haystack = Object.values(project).join(" ").toLowerCase();
  const needle = searchTerm.trim().toLowerCase();
  if (!needle) return true;
  return haystack.includes(needle);
};
</script>
