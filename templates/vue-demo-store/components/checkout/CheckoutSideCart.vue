<script setup lang="ts">
const isOpen = inject("isSidebarOpen");

const { cartItems, totalPrice, isEmpty } = useCart();
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 overflow-hidden"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="absolute inset-0 overflow-hidden">
      <!--
      Background overlay, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        v-if="isOpen"
        class="absolute inset-0 bg-gray-500 bg-opacity-60 transition-opacity"
        aria-hidden="true"
        @click="isOpen = false"
      />

      <div
        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
      >
        <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
        <div v-if="isOpen" class="pointer-events-auto w-screen max-w-md">
          <div class="flex h-full flex-col bg-white shadow-xl">
            <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2
                  id="slide-over-title"
                  class="text-lg font-medium text-gray-900 py-0"
                >
                  Shopping cart
                </h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    @click="isOpen = false"
                  >
                    <span class="sr-only">Close panel</span>
                    <div class="w-6 h-6 i-carbon-close" />
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <ul
                    v-if="!isEmpty"
                    role="list"
                    class="-my-6 px-0 divide-y divide-gray-200"
                  >
                    <li
                      v-for="cartItem in cartItems"
                      :key="cartItem.id"
                      class="flex py-6"
                    >
                      <CheckoutCartItem :cart-item="cartItem" />
                    </li>
                  </ul>
                  <div v-else class="text-2xl text-center">
                    Your shopping cart is empty
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div
                class="flex justify-between text-base font-medium text-gray-900"
              >
                <p>Subtotal</p>
                <SharedPrice :value="totalPrice" data-testid="cart-subtotal" />
              </div>
              <p class="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div class="mt-6">
                <NuxtLink
                  class="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm bg-brand-primary hover:bg-brand-dark"
                  :class="{ 'bg-gray': isEmpty, 'hover:bg-gray': isEmpty }"
                  :to="isEmpty ? '' : '/checkout'"
                  data-testid="cart-checkout-link"
                  @click="isOpen = !isEmpty ? false : true"
                >
                  Checkout
                </NuxtLink>

                <RouterLink
                  class="flex items-center justify-center py-3 text-sm font-medium text-brand-dark"
                  to="/checkout/cart"
                  data-testid="cart-checkout-shopping-cart"
                  @click="isOpen = false"
                >
                  Go to shopping cart
                </RouterLink>
              </div>
              <div
                class="mt-6 flex justify-center text-center text-sm text-brand-dark"
              >
                <p>
                  or
                  <button
                    type="button"
                    class="font-medium"
                    data-testid="cart-continue-button"
                    @click="isOpen = false"
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
