import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

const CacheImage = (props) => {
  const [cacheSource, setCacheSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Kaydedilecek dizini belirleyin
        const directory = FileSystem.cacheDirectory + "images/";
        const fileUri = directory + encodeURIComponent(uri.split("/").pop());

        // Dizinin var olup olmadığını kontrol edin
        const dirInfo = await FileSystem.getInfoAsync(directory);
        if (!dirInfo.exists) {
          // Eğer dizin yoksa, dizini oluştur
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
        }

        // Dosya var mı kontrol et
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          // Dosya varsa onu kullan
          setCacheSource({ uri: fileUri });
        } else {
          // Dosya yoksa, indir ve kaydet
          const downloadedImage = await FileSystem.downloadAsync(uri, fileUri);
          setCacheSource({ uri: downloadedImage.uri });
        }
      } catch (error) {
        console.error("Görüntü indirilemedi:", error);
      }
    };

    getCachedImage();
  }, [uri]);

  return <Image source={cacheSource} {...props} />;
};

export default CacheImage;
