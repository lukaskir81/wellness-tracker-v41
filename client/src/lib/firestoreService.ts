import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// User profile data
export interface UserProfile {
  id?: string;
  uid: string;
  name: string;
  email: string;
  dateOfBirth: string;
  bodyWeight: string;
  profileImage: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Wellness entry data
export interface WellnessEntry {
  id?: string;
  uid: string;
  date: string;
  sleepHours: number;
  sleepQuality: number;
  energyLevel: number;
  mood: number;
  stress: number;
  lowerBodySoreness: number;
  upperBodySoreness: number;
  notes: string;
  createdAt: Timestamp;
}

// Recovery assessment data
export interface RecoveryAssessment {
  id?: string;
  uid: string;
  date: string;
  totalPoints: number;
  selectedItems: Record<string, boolean>;
  assessmentItems: any[];
  createdAt: Timestamp;
}

// Strength tracker data
export interface StrengthEntry {
  id?: string;
  uid: string;
  exercise: string;
  date: string;
  sets: Array<{
    reps: number;
    load: number;
    rir: number;
  }>;
  createdAt: Timestamp;
}

// Fitness test data
export interface FitnessTest {
  id?: string;
  uid: string;
  testName: string;
  date: string;
  result: number;
  unit: string;
  notes?: string;
  createdAt: Timestamp;
}

// Journal entry data
export interface JournalEntry {
  id?: string;
  uid: string;
  date: string;
  content: string;
  aiAnalysis?: string;
  createdAt: Timestamp;
}

// Generic CRUD operations
export const firestoreService = {
  // User Profile
  async createUserProfile(profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'userProfiles'), {
      ...profile,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const q = query(collection(db, 'userProfiles'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as UserProfile;
  },

  async updateUserProfile(id: string, updates: Partial<UserProfile>): Promise<void> {
    await updateDoc(doc(db, 'userProfiles', id), {
      ...updates,
      updatedAt: Timestamp.now()
    });
  },

  // Wellness Entries
  async addWellnessEntry(entry: Omit<WellnessEntry, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'wellnessEntries'), {
      ...entry,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getWellnessEntries(uid: string): Promise<WellnessEntry[]> {
    const q = query(
      collection(db, 'wellnessEntries'),
      where('uid', '==', uid),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WellnessEntry));
  },

  async updateWellnessEntry(id: string, updates: Partial<WellnessEntry>): Promise<void> {
    await updateDoc(doc(db, 'wellnessEntries', id), updates);
  },

  async deleteWellnessEntry(id: string): Promise<void> {
    await deleteDoc(doc(db, 'wellnessEntries', id));
  },

  // Recovery Assessments
  async addRecoveryAssessment(assessment: Omit<RecoveryAssessment, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'recoveryAssessments'), {
      ...assessment,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getRecoveryAssessments(uid: string): Promise<RecoveryAssessment[]> {
    const q = query(
      collection(db, 'recoveryAssessments'),
      where('uid', '==', uid),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RecoveryAssessment));
  },

  // Strength Entries
  async addStrengthEntry(entry: Omit<StrengthEntry, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'strengthEntries'), {
      ...entry,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getStrengthEntries(uid: string): Promise<StrengthEntry[]> {
    const q = query(
      collection(db, 'strengthEntries'),
      where('uid', '==', uid),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StrengthEntry));
  },

  async updateStrengthEntry(id: string, updates: Partial<StrengthEntry>): Promise<void> {
    await updateDoc(doc(db, 'strengthEntries', id), updates);
  },

  async deleteStrengthEntry(id: string): Promise<void> {
    await deleteDoc(doc(db, 'strengthEntries', id));
  },

  // Fitness Tests
  async addFitnessTest(test: Omit<FitnessTest, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'fitnessTests'), {
      ...test,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getFitnessTests(uid: string): Promise<FitnessTest[]> {
    const q = query(
      collection(db, 'fitnessTests'),
      where('uid', '==', uid),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FitnessTest));
  },

  async updateFitnessTest(id: string, updates: Partial<FitnessTest>): Promise<void> {
    await updateDoc(doc(db, 'fitnessTests', id), updates);
  },

  async deleteFitnessTest(id: string): Promise<void> {
    await deleteDoc(doc(db, 'fitnessTests', id));
  },

  // Journal Entries
  async addJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'journalEntries'), {
      ...entry,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async getJournalEntries(uid: string): Promise<JournalEntry[]> {
    const q = query(
      collection(db, 'journalEntries'),
      where('uid', '==', uid),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JournalEntry));
  },

  async updateJournalEntry(id: string, updates: Partial<JournalEntry>): Promise<void> {
    await updateDoc(doc(db, 'journalEntries', id), updates);
  },

  async deleteJournalEntry(id: string): Promise<void> {
    await deleteDoc(doc(db, 'journalEntries', id));
  }
};