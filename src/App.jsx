import { useState } from 'react';
import { parseEpub } from './utils/parseEpub';
import { getWordFrequency } from './utils/getWordFrequency';

const App = () => {
  const [words, setWords] = useState([]);
  const [isAscending, setAscending] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files.item(0);

    if (file) {
      let result = [];

      if (file.type === 'application/epub+zip') {
        result = getWordFrequency(await parseEpub(file));
      } else if (file.type === 'text/plain' || file.name.endsWith('.srt')) {
        result = getWordFrequency(await file.text());
      }

      setWords([...result]);
    }
  };

  const sortCallback = isAscending
    ? (a, b) => a[1] - b[1]
    : (a, b) => b[1] - a[1];

  return (
    <>
      <header className='h-14 shadow bg-white flex items-center'>
        <div className='container mx-auto px-4 md:px-24 font-bold text-2xl'>
          Wordy
        </div>
      </header>

      <main className='container mx-auto px-4 md:px-24 mt-6 mb-10'>
        <label className='text-sm font-medium' htmlFor='file'>
          Upload file
        </label>

        <input
          id='file'
          type='file'
          className='block w-full h-10 border border-zinc-200 shadow cursor-pointer file:border-0 file:h-full file:cursor-pointer'
          accept='.epub,.txt,.srt'
          onChange={handleChange}
        />

        <p className='mt-1 text-sm text-zinc-500'>EPUB, TXT or SRT</p>

        {!!words.length && (
          <>
            <div className='flex items-center my-5'>
              <p className='font-bold text-xl'>Unique Words: {words.length}</p>

              <button
                className='flex ml-auto p-2 bg-zinc-800 text-zinc-50 font-medium rounded hover:bg-zinc-700 transition'
                onClick={() => setAscending((state) => !state)}
              >
                Reverse
              </button>
            </div>

            <ul className='font-medium'>
              {words.sort(sortCallback).map(([word, frequency]) => (
                <li key={word} className='py-1 mb-1 px-3 shadow'>
                  {word} - {frequency}
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
};

export default App;
