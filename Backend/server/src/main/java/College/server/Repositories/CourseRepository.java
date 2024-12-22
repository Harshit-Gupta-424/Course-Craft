package College.server.Repositories;

import College.server.Entities.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByDegreeAndBranchAndSection(String degree, String branch, String section);
}
