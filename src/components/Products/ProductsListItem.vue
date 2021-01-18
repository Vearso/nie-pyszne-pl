<template>
	<div class="product-list-item">
		<div class="product-list-item__picture"
         :style="{ backgroundImage: 'url(' + imgUrl + ')' }">
    </div>

		<div class="product-list-item__description">
			<span class="product-list-item__description__title">
        {{ name }}
      </span>
			<span class="product-list-item__description__price">${{ price }}</span>
		</div>

		<div class="product-list-item__rating">
			<IconStar class="product-list-item__star" />
			<span>{{ rating }}</span>
		</div>

	</div>
</template>

<script lang="ts">
import IconStar from "@/assets/icons/icon-stars.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		IconStar
	},
	name: "ProductsListItem",
	props: {
		id: String,
		name: String,
		type: String,
		price: Number,
		imgUrl: String,
		rating: Number
	}
});
</script>

<style lang="scss" scoped>
.product-list-item {
  @apply relative grid h-64 m-0.5 text-lg;
	grid-template-rows: 12rem 1fr;

	&__rating {
    @apply absolute flex justify-evenly pb-1.5 pt-1.5 right-0 h-10 w-20 font-black font-bold bg-white;

		.product-list-item__star {
			@apply w-6 h-6;
		}
	}

	&__picture {
    @apply bg-cover bg-center;
		border-radius: 2rem 0;
		filter: contrast(0.5);
	}

	&__description {
    @apply flex justify-between py-4 px-0.5 font-bold border-t-0 box-border truncate;
		border: 1px solid #efefee;

		&__title {
      @apply truncate inline-block uppercase text-secondary-light;
		}

		&__price {
      @apply text-primary;
		}
	}

	&:hover {
    @apply cursor-pointer;
		box-shadow: 4px 4px 3px 0 rgba(71, 61, 86, 0.1);

		:first-child {
			@apply text-secondary-dark;
			filter: contrast(1);
		}
	}
}
</style>
