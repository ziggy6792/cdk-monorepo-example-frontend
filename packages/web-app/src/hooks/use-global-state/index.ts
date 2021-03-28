/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

type DispatcherFunctionType = (value: any) => void;
type DispatcherType = null | DispatcherFunctionType;
export interface KeysNodeType {
    value: any;
    dispatchers: Array<DispatcherType>;
    centralDispatcher: DispatcherFunctionType;
    [key: string]: string | Array<DispatcherType> | DispatcherFunctionType;
}
interface KeysType {
    [key: string]: KeysNodeType;
}
type UseGlobalStateReturnType = [any, DispatcherFunctionType];

const keys: KeysType = {};
const createCentralDispatcher = (key: string) => (value: any) => {
    keys[key].value = value;
    keys[key].dispatchers.forEach((dispatcher: DispatcherType | null) => dispatcher && dispatcher(value));
};

// This resets the dispatchers arrays on keys that all null, indicating
// that the components that use this global state have been all unmounted
// We don't want to leave around a bunch of arrays that are just stuffed
// full of null values. For long-running applications, this can be
// memory intensive. We trade a tiny bit of up-front performance here for
// better long-term memory management.
function resetEmptyKeys(): void {
    Object.keys(keys).forEach((key: string) => {
        let allNull = true;
        keys[key].dispatchers.forEach((dispatcher: DispatcherType) => {
            if (!allNull) return;
            if (dispatcher !== null) {
                allNull = false;
            }
        });
        if (allNull) {
            keys[key].dispatchers = [];
        }
    });
}
// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

export function useGlobalState<S>(key: string, initialState: S): UseGlobalStateReturnType {
    // Some basic cleaning
    resetEmptyKeys();

    const [state, dispatcher] = useState(initialState);

    if (!keys[key]) {
        keys[key] = {
            value: initialState,
            centralDispatcher: createCentralDispatcher(key),
            dispatchers: [],
        } as any;
    }

    useEffect(() => {
        const index: number = keys[key].dispatchers.push(dispatcher) - 1;
        return () => {
            keys[key].dispatchers[index] = null;
        };
    }, []);

    const value: any = keys[key] && keys[key].value ? keys[key].value : state;
    return [value, keys[key].centralDispatcher];
}
