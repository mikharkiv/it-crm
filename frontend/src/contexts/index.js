import * as React from "react";
import {RootStore} from "../stores/RootStore";

export const globalStores = {
	rootStore: new RootStore(),
}

export const storesContext = React.createContext({
	rootStore: globalStores.rootStore,
})
