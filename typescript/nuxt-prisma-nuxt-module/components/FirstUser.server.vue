<script setup>
// Query using the auto-imported instance of PrismaClient composable
const prisma = usePrismaClient()

const user = await prisma.user.findFirst({
  orderBy: {
    id: 'asc',
  },
})
</script>

<template>
  {{ user ?? 'No user has been added yet.' }}
</template>
