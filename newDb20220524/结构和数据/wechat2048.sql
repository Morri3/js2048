/*
 Navicat Premium Data Transfer

 Source Server         : wechat2048
 Source Server Type    : MySQL
 Source Server Version : 50556
 Source Host           : localhost:3306
 Source Schema         : wechat2048

 Target Server Type    : MySQL
 Target Server Version : 50556
 File Encoding         : 65001

 Date: 24/05/2022 15:38:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户编号',
  `cur_grade` int(11) NULL DEFAULT NULL COMMENT '当前分数',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '游戏记录创建时间',
  `game_mode` int(11) NULL DEFAULT NULL COMMENT '游戏难度 0：正常模式 1：困难模式',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (7, 86, 256, '2022-05-19 10:35:43', 1);
INSERT INTO `record` VALUES (8, 86, 32, '2022-05-19 10:41:21', 1);
INSERT INTO `record` VALUES (9, 86, 64, '2022-05-19 10:46:06', 0);
INSERT INTO `record` VALUES (10, 86, 64, '2022-05-19 13:28:07', 0);
INSERT INTO `record` VALUES (11, 86, 128, '2022-05-24 13:30:29', 0);
INSERT INTO `record` VALUES (12, 86, 128, '2022-05-24 13:31:47', 0);
INSERT INTO `record` VALUES (13, 86, 128, '2022-05-24 13:33:26', 1);
INSERT INTO `record` VALUES (14, 86, 32, '2022-05-24 15:15:03', 0);
INSERT INTO `record` VALUES (15, 86, 64, '2022-05-24 15:25:53', 0);
INSERT INTO `record` VALUES (16, 86, 64, '2022-05-24 15:26:35', 0);
INSERT INTO `record` VALUES (17, 86, 128, '2022-05-24 15:27:32', 0);
INSERT INTO `record` VALUES (18, 86, 64, '2022-05-24 15:28:20', 1);
INSERT INTO `record` VALUES (19, 86, 64, '2022-05-24 15:33:04', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `user_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `max_grade` int(11) NULL DEFAULT NULL COMMENT '最高分数',
  `cur_grade` int(11) NULL DEFAULT NULL COMMENT '当前分数',
  `max_difficult_grade` int(11) NULL DEFAULT NULL COMMENT '困难模式最高分数',
  `cur_difficult_grade` int(11) NULL DEFAULT NULL COMMENT '困难模式当前分数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 87 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (86, 'Morri', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJoI30ZI2Ca34eXCcW3fJRaXribgbp2nAdFQiaYKTZ5Ia4TmhNQYrRH2ACb2HkTQfDFGPthP8WslCnA/132', 256, 128, 256, 64);

SET FOREIGN_KEY_CHECKS = 1;
