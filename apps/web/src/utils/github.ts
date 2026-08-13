export async function getRepositories() {
    const token = process.env.GITHUB_TOKEN || import.meta.env?.GITHUB_TOKEN;
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DevPro-DXP-Builder'
    };
    if (token) {
        headers['Authorization'] = `token ${token}`;
    }
    
    // Attempt fetching from orgs first
    const response = await fetch('https://api.github.com/orgs/DevPro-CORPORATION/repos', {
        headers
    });
    
    if (!response.ok) {
        // Fallback to users API if the org fetch fails (in case it is an individual user account)
        const userResponse = await fetch('https://api.github.com/users/DevPro-CORPORATION/repos', {
            headers
        });
        if (!userResponse.ok) {
            console.error("Failed to fetch repositories:", await userResponse.text());
            return [];
        }
        return await userResponse.json();
    }
    
    return await response.json();
}
