export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAuthenticated = await checkLogin();

    if (!isAuthenticated && to.path !== '/login') {
        return navigateTo('/login')
    }
})