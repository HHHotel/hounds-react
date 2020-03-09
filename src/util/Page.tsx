// eslint-disable-next-line
import React from "react";

interface PageProps {
    children: any[]
}

/**
 * @param {PageProps} props
 * @return {React.ReactElement} el
 */
function Page(props: PageProps) {
    const path = window.location.pathname;
    const matchEl = props.children.find((child) => child.props.path === path);
    if (matchEl) {
        return matchEl;
    } else {
        // window.location.pathname = "/";
        return null;
    }
}

export default Page;

interface PageRouteProps {
    path: string
    children: any
}

/**
 * @param {PageRouteProps} props
 * @return {React.ReactElement} el
 */
export function PageRoute(props: PageRouteProps) {
    return props.children;
}
