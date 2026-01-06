import {configureStore} from "@reduxjs/toolkit" 
import rootRedcuer from "./rootRedcuer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
});

const initializeApp = async () => {
    // Force refetch and don't use cache
    await appStore.dispatch(authApi.endpoints.loadUser.initiate(undefined, {forceRefetch: true}))
}
initializeApp();