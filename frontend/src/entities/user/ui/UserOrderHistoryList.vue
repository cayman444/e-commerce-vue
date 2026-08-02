<script setup lang="ts">
import { computed } from 'vue'
import type { IOrder } from './UserOrderHistory.vue'
import UserOrderHistoryItem from './UserOrderHistoryItem.vue'

const props = defineProps<{
  orders?: IOrder[]
}>()

const statusLabels: Record<IOrder['status'], { label: string; class: string }> = {
  delivered: {
    label: 'Доставлен',
    class: 'bg-neutral text-tertiary border border-secondary/10',
  },
  processing: {
    label: 'В обработке',
    class: 'bg-primary/10 text-primary border border-primary/20',
  },
  cancelled: {
    label: 'Отменен',
    class: 'bg-red-500/10 text-red-600 border border-red-500/20',
  },
}

const formattedOrdersList = computed(() => {
  const list = props.orders || []

  return list.length > 6 ? list.slice(0, 6) : list
})
</script>

<template>
  <ul class="flex flex-col border-b border-secondary/10">
    <UserOrderHistoryItem
      v-for="order in formattedOrdersList"
      :key="order.id"
      :order="order"
      :status-label="statusLabels[order.status] || statusLabels.delivered"
    />
  </ul>
</template>
