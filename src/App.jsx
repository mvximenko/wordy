import { useState, useEffect, useRef } from 'react';
import { parseEpub } from '@/utils/parseEpub';
import { getWordFrequency } from '@/utils/getWordFrequency';
import { Pagination } from './components/pagination';
import 'preline/preline';

const App = () => {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);
  const myRef = useRef(null);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files.item(0);
    if (file) {
      let result = [];

      if (file.type === 'application/epub+zip') {
        result = getWordFrequency(await parseEpub(file));
      } else if (file.type === 'text/plain' || file.name.endsWith('.srt')) {
        result = getWordFrequency(await file.text());
      }

      setWords([...result].sort((a, b) => b[1] - a[1]));
      setPage(1);
    }
  };

  const limit = 100;
  const paginatedWords = words.slice((page - 1) * limit, page * limit);

  return (
    <>
      <header className='h-14 shadow bg-white flex items-center font-bold text-2xl '>
        <div className='container mx-auto px-4 md:px-24'>Wordy</div>
      </header>

      <main className='container mx-auto px-4 md:px-24 mt-6 mb-10'>
        <label className='mb-2 text-sm font-medium' htmlFor='file'>
          Upload file
        </label>

        <input
          type='file'
          id='file'
          className='block w-full h-10 border border-gray-200 shadow cursor-pointer file:border-0 file:h-full file:cursor-pointer'
          accept='.epub,.txt,.srt'
          onChange={handleChange}
        />

        <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
          EPUB, TXT or SRT
        </p>

        {!!paginatedWords.length && (
          <>
            <h2 className='mt-5 mb-4 font-bold text-xl' ref={myRef}>
              Unique Words: {words.length}
            </h2>

            {paginatedWords.map(([word, frequency]) => (
              <div className='p-2 mb-2 flex shadow' key={word}>
                <input className='accent-black w-5 mr-5' type='checkbox' />
                <p className='font-medium'>
                  {word} - <span>{frequency}</span>
                </p>
              </div>
            ))}

            <Pagination
              page={page}
              limit={limit}
              items={words.length}
              setPage={(page) => {
                myRef.current.scrollIntoView();
                setPage(page);
              }}
            />
          </>
        )}
      </main>
    </>
  );
};

export default App;
