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

 Date: 19/05/2022 10:50:25
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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (1, 86, 64, '2022-05-18 19:04:15', NULL);
INSERT INTO `record` VALUES (2, 86, 64, '2022-05-18 19:08:39', NULL);
INSERT INTO `record` VALUES (3, 86, 32, '2022-05-18 19:26:05', NULL);
INSERT INTO `record` VALUES (4, 86, 32, '2022-05-18 19:27:59', NULL);
INSERT INTO `record` VALUES (5, 86, 32, '2022-05-18 19:36:44', NULL);
INSERT INTO `record` VALUES (7, 86, 256, '2022-05-19 10:35:43', 1);
INSERT INTO `record` VALUES (8, 86, 32, '2022-05-19 10:41:21', 1);
INSERT INTO `record` VALUES (9, 86, 64, '2022-05-19 10:46:06', 0);

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
INSERT INTO `user` VALUES (86, 'Morri', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJoI30ZI2Ca34eXCcW3fJRaXribgbp2nAdFQiaYKTZ5Ia4TmhNQYrRH2ACb2HkTQfDFGPthP8WslCnA/132', 256, 64, 256, 32);

SET FOREIGN_KEY_CHECKS = 1;
