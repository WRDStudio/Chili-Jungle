import * as mmb from 'music-metadata-browser';

export async function testParse(url: string) {
    return mmb.fetchFromUrl(url);
}
