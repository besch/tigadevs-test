
export const toLocalStorage = (data: any) => window.localStorage.setItem('algotrader', JSON.stringify(data));

export const fromLocalStorage = () => JSON.parse(window.localStorage.getItem('algotrader'));