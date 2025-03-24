
import React, { useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Extract YouTube video ID from URL
    const extractYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    setVideoId(extractYouTubeId(videoUrl));
  }, [videoUrl]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {videoId ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
          <p className="text-muted-foreground">Invalid YouTube URL</p>
        </div>
      )}
    </div>
  );
};
