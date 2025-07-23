import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';

const FirebaseDebug: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <Card className="glass-dark p-4 mb-4 border-yellow-500/30">
        <div className="text-yellow-400">
          <strong>Firebase Status:</strong> Loading authentication...
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="glass-dark p-4 mb-4 border-red-500/30">
        <div className="text-red-400">
          <strong>Firebase Status:</strong> User not authenticated
          <br />
          <small>This will cause permission-denied errors. Please log in.</small>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-dark p-4 mb-4 border-green-500/30">
      <div className="text-green-400">
        <strong>Firebase Status:</strong> Authenticated ✓
        <br />
        <small>UID: {user.uid}</small>
        <br />
        <small>Email: {user.email}</small>
        <div className="mt-2 text-white/80 text-xs">
          If you're still seeing permission errors, the Firestore security rules need to be deployed.
          Check the FIREBASE_SETUP.md file for instructions.
        </div>
      </div>
    </Card>
  );
};

export default FirebaseDebug;