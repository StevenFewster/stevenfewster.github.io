<template>
  <div class="w-full p-4">
    <div class="flex h-full bg-wedgewood-50 p-4">
      <div class="flex flex-grow flex-col">
        <div class="flex">
          <h2 class="title-font flex-grow text-lg font-medium">
            {{ project.name }}
          </h2>

          <span
            class="rounded-full border border-wedgewood-200 bg-red-50 px-3 py-1 text-sm text-wedgewood-600"
            v-bind:class="{ 'bg-wedgewood-200': project.status === 'Complete' }"
          >
            {{ project.status }}
          </span>
        </div>

        <p class="text-md mb-3 grow text-gray-500">
          {{ project.shortDescription }}
        </p>
        <p class="mb-3 text-sm">{{ project.description }}</p>
        <div class="flex">
          <div class="flex flex-grow gap-1">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="nobspace whitespace-nowrap rounded-full border border-wedgewood-200 px-3 py-1 text-sm"
              :class="
                tagMatch(tag, searchTerm)
                  ? 'bg-wedgewood-300 text-wedgewood-700'
                  : 'bg-wedgewood-50 text-wedgewood-600'
              "
            >
              {{ tag }}
            </span>
          </div>
          <div>
            <p class="flex gap-2 text-right">
              <a
                v-if="project.liveLink"
                :href="project.liveLink"
                target="_blank"
                class="text-wedgewood-600"
                title="View project site"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <a
                v-if="project.githubLink"
                :href="project.githubLink"
                target="_blank"
                class="text-wedgewood-600"
                title="View project on GitHub"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="h-5 w-5"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectItem } from "./ProjectList.vue";

defineProps<{ project: ProjectItem; searchTerm: string }>();

const tagMatch = (tag: string, searchTerm: string) => {
  return (
    searchTerm.trim() !== "" &&
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
</script>
