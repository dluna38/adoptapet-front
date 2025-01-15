export const checkLogin = async () => {
    try {
        const token = useCookie('token');
        if (!token.value) {
            return false;
        }
        const response = await useAPI('/auth');

        if (response.status.value === 'success') {
            return true
        }
    } catch (error) {}
    return false;
};