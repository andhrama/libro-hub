/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: bookcatalog
 * Interface for BookCatalog
 */
export interface BookCatalog {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  genre?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType image */
  coverImage?: string;
  /** @wixFieldType text */
  isbn?: string;
}


/**
 * Collection ID: libraryinformation
 * Interface for LibraryInformation
 */
export interface LibraryInformation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  sectionName?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType date */
  dateEstablished?: Date | string;
  /** @wixFieldType text */
  missionStatement?: string;
  /** @wixFieldType text */
  visionStatement?: string;
  /** @wixFieldType image */
  mainImage?: string;
}


/**
 * Collection ID: libraryphotos
 * Interface for LibraryPhotos
 */
export interface LibraryPhotos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  photoTitle?: string;
  /** @wixFieldType image */
  photo?: string;
  /** @wixFieldType text */
  photoDescription?: string;
  /** @wixFieldType date */
  dateTaken?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  photographer?: string;
}
