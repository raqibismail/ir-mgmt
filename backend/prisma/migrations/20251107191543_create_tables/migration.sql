-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Referral` (
    `id` VARCHAR(191) NOT NULL,
    `dateOfReferral` DATETIME(3) NULL,
    `timeOfReferral` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `rnNumber` VARCHAR(191) NULL,
    `icNumber` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `sex` ENUM('MALE', 'FEMALE') NULL,
    `department` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `diagnosis` VARCHAR(191) NULL,
    `sofaScore` INTEGER NULL,
    `categoryVentilated` INTEGER NULL,
    `reasonForReferral` VARCHAR(191) NULL,
    `intubatedAfterNivHfnc` BOOLEAN NULL,
    `intubationDate` DATETIME(3) NULL,
    `admittedToICU` BOOLEAN NULL,
    `admissionPlanned` BOOLEAN NULL,
    `anesthesiaRelated` BOOLEAN NULL,
    `notAdmittedReason` VARCHAR(191) NULL,
    `hospitalOutcome` VARCHAR(191) NULL,
    `medicalOfficerName` VARCHAR(191) NULL,
    `siteCoordinator` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
