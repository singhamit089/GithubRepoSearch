import axios from 'axios';
import { GitHubRepo } from '@models/GitHubRepo';

export const GitHubAPIManager = {
  async searchRepos(query: string): Promise<GitHubRepo[]> {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`
    );
    return response.data.items;
  },
};
