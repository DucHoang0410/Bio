import { ResponseDataType, getRequest, postRequest } from 'api'; // Import postRequest
import { useEffect, useState } from 'react';
import { PhotoDataType, PhotoListDataType, columns } from './const';
import { toast } from 'react-toastify';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';

export const PhotoList = () => {
  const [photoList, setPhotoList] = useState<PhotoDataType[]>([]);
  const { momentId } = useParams<{ momentId: string }>();

  // Fetch the list of photos associated with the momentId
  const getPhotoList = async () => {
    if (momentId) {
      try {
        const response: ResponseDataType<PhotoListDataType> = await getRequest(`/photo/${momentId}`);
        
        if (response.code === 200) {
          setPhotoList(Array.isArray(response.info) ? response.info : []); 
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.error('Error fetching photo list:', error);
        toast.error('Failed to load photos.');
      }
    }
  };

  useEffect(() => {
    getPhotoList(); // Call getPhotoList on component mount
  }, [momentId]);

  // Function to handle file upload using postRequest
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('test_moment_id', momentId || '');

      Array.from(files).forEach(file => {
        formData.append('photos', file);
      });

      try {
        // Use postRequest instead of axios directly
        const response = await postRequest('/photo/create-photos', formData, 'form-data');

        if (response.code === 200) {
          toast.success('Photos uploaded successfully!');
          // Optionally update the state with newly uploaded photos
          setPhotoList(prev => [...prev, ...response.data]); // Assuming response.data contains the new photos
          event.target.value = ''; // Clear input after upload
          getPhotoList(); // Refresh the photo list
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.error('Error uploading photos:', error);
        toast.error('Error uploading photos.');
      }
    } else {
      toast.error('Please select at least one file.');
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        style={{ marginBottom: '20px' }}
      />
      <Table columns={columns} dataSource={photoList} rowKey='_id' />
    </div>
  );
};
