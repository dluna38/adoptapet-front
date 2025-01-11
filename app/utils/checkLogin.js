export const checkLogin = async () => {
    try {
        const response = await useAPI('/auth');

        if (response.status.value === 'success') {
            return true
        }
    } catch (error) {}
    return false;
};