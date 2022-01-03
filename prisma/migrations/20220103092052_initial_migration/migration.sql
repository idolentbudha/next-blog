-- Create Users Table
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) ,
    `lastName` VARCHAR(191),
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `password` VARCHAR(191) NOT NULL,
    -- `contactNumber` VARCHAR(191) NOT NULL UNIQUE,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) ,

    UNIQUE INDEX `user_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Create Post Table
CREATE TABLE `Posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT ,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) ,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`createdBy`) REFERENCES Posts(`id`)      
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



