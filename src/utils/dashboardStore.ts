
export interface DashboardData {
    efficiency?: number;
    monthlyIncome?: number;
    assetScore?: string;
    loanAmount?: number;
    downPayment?: number;
    growthPercentage?: number;
    riskLevel?: string;
    riskScore?: number;
}

const STORAGE_KEY = 'lyka_dashboard_data';

export const saveDashboardData = (data: Partial<DashboardData>) => {
    try {
        const existingData = getDashboardData();
        const newData = { ...existingData, ...data };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
        console.error('Error saving dashboard data:', error);
    }
};

export const getDashboardData = (): DashboardData => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        return {};
    }
};

export const clearDashboardData = () => {
    localStorage.removeItem(STORAGE_KEY);
};
