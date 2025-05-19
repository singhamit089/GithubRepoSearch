import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchRepositories = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`
      );
      setRepositories(response.data.items);
    } catch (error) {
      console.error('Error searching repositories:', error);
      Alert.alert("Error", "Something went wrong. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  const renderRepositoryItem = ({ item }: { item: Repository }) => (
    <TouchableOpacity
      style={styles.repoItem}
      onPress={() => router.push(`/${item.full_name}`)}
    >
      <Text style={styles.repoName}>{item.name}</Text>
      <Text style={styles.repoDescription} numberOfLines={2}>
        {item.description || 'No description available'}
      </Text>
      <View style={styles.repoStats}>
        <Text style={styles.repoStat}>⭐ {item.stargazers_count}</Text>
        {item.language && (
          <Text style={styles.repoStat}>🔤 {item.language}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search GitHub repositories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => searchRepositories(searchQuery)}
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#24292e" style={styles.loader} />
      ) : (
        <FlatList
          data={repositories}
          renderItem={renderRepositoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f6f8fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  listContainer: {
    padding: 16,
  },
  repoItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0366d6',
    marginBottom: 4,
  },
  repoDescription: {
    fontSize: 14,
    color: '#586069',
    marginBottom: 8,
  },
  repoStats: {
    flexDirection: 'row',
    gap: 16,
  },
  repoStat: {
    fontSize: 12,
    color: '#586069',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 