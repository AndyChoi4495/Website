import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

export default function RouteGuard(props) {
    const [authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistoryList, setSearchHistory] = useAtom(searchHistoryAtom);
    const PUBLIC_PATHS = ['/login', '/register', '/', '/_error'];
    const router = useRouter();

    useEffect(() => {
        updateAtoms();

        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        }
        else {
            setAuthorized(true);
        }
    }

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

  return <>{props.children}</>
}
