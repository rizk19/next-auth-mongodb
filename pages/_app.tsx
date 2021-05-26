import React from "react";
import { AppProps } from "next/app";
import "@styles/app.scss";
import "@styles/global.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    console.log("pageProps.session", pageProps.session);

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <AuthProvider session={pageProps.session}>
                    <ReduxProvider store={store}>
                        <Component {...pageProps} />
                    </ReduxProvider>
                </AuthProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
