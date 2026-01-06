import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

// const USER_API = "http://localhost:8080/api/v1/user/"

const USER_API = `${import.meta.env.VITE_API_URL}/user/`;


export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    if(result.data.user){
                        dispatch(userLoggedIn({user:result.data.user}));
                    }
                } catch (error) {
                    console.log("Register error:", error);
                }
            }
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled, getState}) {
                // Dispatch logout immediately to clear state
                dispatch(userLoggedOut());
                
                try {
                    await queryFulfilled;
                    // After successful logout, reset the API state to clear all cached queries
                    dispatch(authApi.util.resetApiState());
                    // Also try to clear cookie on client side as backup
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=none;";
                } catch (error) {
                    // Even if the request fails, state is already cleared
                    // Still reset API state to clear cache
                    dispatch(authApi.util.resetApiState());
                    // Try to clear cookie on client side as backup
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=none;";
                    console.log("Logout error:", error);
                }
            },
        }),
        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method:"GET"
            }),
            // Don't cache this query - always fetch fresh data
            keepUnusedDataFor: 0,
            async onQueryStarted(_, {queryFulfilled, dispatch, getState}) {
                try {
                    const result = await queryFulfilled;
                    console.log("LoadUser success - data:", result.data);
                    
                    // Check if we recently logged out (within last 30 seconds)
                    const logoutTimestamp = localStorage.getItem('logoutTimestamp');
                    if(logoutTimestamp) {
                        const timeSinceLogout = Date.now() - parseInt(logoutTimestamp);
                        if(timeSinceLogout < 30000) {
                            console.log("LoadUser - Preventing restore, too soon after logout (", timeSinceLogout, "ms ago)");
                            // Don't restore user if we just logged out
                            dispatch(userLoggedOut());
                            return;
                        } else {
                            // More than 30 seconds, clear the timestamp and allow login
                            localStorage.removeItem('logoutTimestamp');
                        }
                    }
                    
                    if(result.data && result.data.user){
                        dispatch(userLoggedIn({user:result.data.user}));
                    } else {
                        // No user in response, clear state
                        console.log("LoadUser - No user in response, clearing state");
                        dispatch(userLoggedOut());
                    }
                } catch (error) {
                    // If loadUser fails (401, 404, etc.), ensure user is logged out
                    const errorStatus = error?.error?.status || error?.error?.data?.status || error?.error?.originalStatus;
                    const errorData = error?.error?.data;
                    console.log("LoadUser error - status:", errorStatus, "data:", errorData);
                    
                    // Always clear state on any error from loadUser
                    dispatch(userLoggedOut());
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;