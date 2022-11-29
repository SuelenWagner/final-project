import create from "zustand";

const useStore = create((set: Function, get: Function) => ({
	user: {},

	setUser: (user: any) => {
		set(() => ({ user: user }));
	},
}));

export default useStore;