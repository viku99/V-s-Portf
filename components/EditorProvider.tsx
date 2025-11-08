import { createContext, useState, useEffect, useCallback, useContext, ReactNode } from 'react';
import { SiteContent } from '../types';

// --- Context Definition ---
interface EditorContextType {
    isLoading: boolean;
    siteContent: SiteContent | null;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};

// --- Provider Component ---
export const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch the original content
            const response = await fetch('./data/content.json');
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setSiteContent(data);
        } catch (error) {
            console.error("Failed to load portfolio data:", error);
            // Handle error state, maybe set siteContent to an error object
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);
    
    const value = {
        isLoading,
        siteContent,
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};