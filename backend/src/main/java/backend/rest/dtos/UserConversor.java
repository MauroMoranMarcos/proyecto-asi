package backend.rest.dtos;

import backend.model.entities.User;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static backend.rest.dtos.UserPointsConversor.toUserPointsDto;
import static backend.rest.dtos.UserSettingsConversor.toUserSettingsDto;

public class UserConversor {

    private UserConversor() {}

    public final static UserDto toUserDto(User user) {
        return new UserDto(user.getId(), user.getUserName(), user.getPassword(), user.getEmail(), user.getRole().toString());
    }

    public final static User toUser(UserDto userDto) {

        return new User(userDto.getUserName(), userDto.getPassword(), userDto.getEmail(),
                Objects.equals(userDto.getRole(), "ADMIN_STAFF") ? User.RoleType.ADMIN_STAFF : User.RoleType.WAREHOUSE_STAFF);
    }

    public final static List<UserDto> toUserDtos(List<User> users) {

        return users.stream().map(u -> toUserDto(u)).collect(Collectors.toList());

    }

    public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {

        return new AuthenticatedUserDto(serviceToken, toUserDto(user));

    }

}
