<script setup lang="ts">
import { CmsBlockGalleryBuybox } from "@shopware-pwa/composables-next";

const props = defineProps<{
  content: CmsBlockGalleryBuybox;
}>();

const { getSlotContent } = useCmsBlock(props.content);
const rightContent = getSlotContent("right");
const leftContent = getSlotContent("left");
</script>

<template>
  <div class="container mx-auto flex flex-row gap-10">
    <div class="overflow-hidden basis-4/6">
      <CmsGenericElement :content="leftContent" />
    </div>
    <div class="basis-2/6">
      <CmsGenericElement :content="rightContent" />
    </div>
  </div>
</template>
