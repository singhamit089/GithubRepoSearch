import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { GitHubAPIManager } from '@managers/GitHubAPIManager';
import { GitHubRepo } from '@models/GitHubRepo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) { return; }
    setLoading(true);
    try {
      const results = await GitHubAPIManager.searchRepos(query);
      setRepos(results);
    } catch (error) {
      console.error('Error fetching repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: GitHubRepo }) => (
    <TouchableOpacity
      style={styles.repoItem}
      onPress={() => navigation.navigate('RepoDetail', { repo: item })}
    >
      <Text style={styles.repoName}>{item.full_name}</Text>
      <Text numberOfLines={2}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search GitHub Repositories"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  repoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  repoName: {
    fontWeight: 'bold',
  },
});
