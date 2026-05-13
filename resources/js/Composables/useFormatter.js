export default function useFormatter() {
    /**
     * Formats 380982925252 to 098 292 5252
     */
    const formatPhone = (phone) => {
        if (!phone) return '—';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('380') && cleaned.length === 12) {
            const part = cleaned.substring(2); 
            return `${part.substring(0, 3)} ${part.substring(3, 6)} ${part.substring(6)}`;
        }
        return phone;
    };

    /**
     * Форматування валюти (про всяк випадок)
     */
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(value);
    };

    return { formatPhone, formatCurrency };
}