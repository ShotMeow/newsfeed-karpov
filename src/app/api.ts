import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { Category } from '@features/categories/types';
import { NewsAPI } from '@features/articlesList/types';
import { ArticleItemAPI } from '@features/articleItem/types';
import { IPartnerArticle } from '@features/partnersArticles/types';
import { RelatedArticlesAPI } from '@features/relatedNews/types';
import { Source } from '@features/sources/types';

export let firebaseApp: FirebaseApp;

export const initializeAPI = (): FirebaseApp => {
  firebaseApp = initializeApp({
    apiKey: 'AIzaSyAD31X3aRpEKhcIDmjGrt7xCOlsrBESdtw',
    authDomain: 'newsfeed-446ff.firebaseapp.com',
    projectId: 'newsfeed-446ff',
    storageBucket: 'newsfeed-446ff.appspot.com',
    messagingSenderId: '520036578986',
    appId: '1:520036578986:web:7fd0d004da9157b5b8c2d3',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);
  return firebaseApp;
};

const partnersPostsCollection = 'partners-posts';

export const getPartnersArticles = async (): Promise<IPartnerArticle[]> => {
  const db = getFirestore();
  const articles: IPartnerArticle[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, partnersPostsCollection));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;

      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return articles;
};

export const createPartnerArticle = async (data: Omit<IPartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, partnersPostsCollection), data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnerArticle = async (id: string, data: Omit<IPartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersPostsCollection, id);

  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnerArticle = async (id: string): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersPostsCollection, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPartnerArticle = async (id: string): Promise<IPartnerArticle> => {
  const db = getFirestore();
  const docRef = doc(db, partnersPostsCollection, id);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnerArticle, 'id'>;

      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      return Promise.reject('Такой статьи нет');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `${file.name}-${Date.now()}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMainPartnerArticle = async (): Promise<IPartnerArticle | null> => {
  const db = getFirestore();
  let article = null;

  try {
    const q = query(collection(db, partnersPostsCollection), orderBy('created', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;

      article = {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return article;
};

export const apiFetchNews = (): Promise<NewsAPI> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/ru/news').then((response) => response.json());
};

export const apiFetchTrends = (): Promise<NewsAPI> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/ru/trends').then((response) => response.json());
};

export const apiFetchCategory = (id: number): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${id}`).then((response) => response.json());
};

export const apiFetchCategories = (): Promise<Category[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/categories').then((response) => response.json());
};

export const apiFetchSources = (): Promise<Source[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) => response.json());
};

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) =>
    response.json()
  );
};

export const apiFetchArticleItem = (id: number): Promise<ArticleItemAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`).then((response) => response.json());
};
